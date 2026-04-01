# E2E Admin Flow Test
# Usage: Run in PowerShell. Assumes backend running at http://localhost:5000 and frontend not needed.

$api = 'http://localhost:5000/api'

function PostJson($url, $obj, $token = $null){
  try{
    $headers = @{}
    if ($token) { $headers['Authorization'] = "Bearer $token" }
    return Invoke-RestMethod -Uri $url -Method Post -ContentType 'application/json' -Headers $headers -Body ($obj | ConvertTo-Json -Depth 5) -ErrorAction Stop
  } catch {
    Write-Host "POST $url failed:`n$_" -ForegroundColor Red
    return $null
  }
}

function GetJson($url){
  try{ return Invoke-RestMethod -Uri $url -Method Get -ErrorAction Stop } catch { Write-Host "GET $url failed: $_" -ForegroundColor Red; return $null }
}

Write-Host "1) Reset admin password and login"
$reset = PostJson "$api/auth/reset-admin" @{ password = 'admin123' }
Write-Host "Reset result:"; $reset

$login = PostJson "$api/auth/login" @{ username = 'admin'; password = 'admin123' }
if (-not $login) { Write-Host 'Login failed, aborting' -ForegroundColor Red; exit 1 }
$token = $login.token
Write-Host "Logged in, token length:" $token.Length

function CurlMultipart($method, $url, $token, $formFields){
  # Use curl.exe to do multipart forms reliably on Windows
  $args = @('-s','-X',$method,$url)
  if ($token) { $args += ('-H', "Authorization: Bearer $token") }
  foreach ($k in $formFields.Keys) {
    $v = $formFields[$k]
    if ($v -is [System.IO.FileInfo]) {
      $args += ('-F', "$k=@$($v.FullName)")
    } else {
      $args += ('-F', "$k=$v")
    }
  }
  $out = & curl.exe @args
  try { return $out | ConvertFrom-Json } catch { Write-Host ("Non-JSON response from {0}`n{1}" -f $url, $out); return $out }
}

Write-Host "2) Gallery: create (photo), create (video), list, delete"
$img = Join-Path $PSScriptRoot 'Backend\uploads\1774716793679-dance.avif'
if (-not (Test-Path $img)) { $img = Join-Path $PSScriptRoot 'Backend\uploads\1774716732356-dance.avif' }

$g1 = CurlMultipart 'POST' "$api/gallery" $token @{ title='E2E Photo'; type='photo'; category='events'; file = Get-Item $img }
Write-Host "Created gallery photo:"; $g1

$g2 = CurlMultipart 'POST' "$api/gallery" $token @{ title='E2E Video'; type='video'; category='events'; videoUrl='https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
Write-Host "Created gallery video:"; $g2

$list = GetJson "$api/gallery"
Write-Host "Gallery count:" ($list | Measure-Object).Count

if ($g1.id) { $del = Invoke-RestMethod -Uri "$api/gallery/$($g1.id)" -Method Delete -Headers @{ Authorization = "Bearer $token" } -ErrorAction SilentlyContinue; Write-Host "Deleted gallery id $($g1.id)" }

Write-Host "3) Events: create/update/delete"
$eimg = Get-Item $img
$ev = CurlMultipart 'POST' "$api/events" $token @{ title='E2E Event'; description='Automated event'; date=(Get-Date).ToString('yyyy-MM-dd'); location='Test'; image = $eimg }
Write-Host "Created event:"; $ev
if ($ev.id) {
  $updated = Invoke-RestMethod -Uri "$api/events/$($ev.id)" -Method Put -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body (@{ title='E2E Event Updated' } | ConvertTo-Json)
  Write-Host "Updated event:" $updated.title
  Invoke-RestMethod -Uri "$api/events/$($ev.id)" -Method Delete -Headers @{ Authorization = "Bearer $token" }
  Write-Host "Deleted event $($ev.id)"
}

Write-Host "4) Teachers: create/delete"
$t = CurlMultipart 'POST' "$api/teachers" $token @{ name='E2E Teacher'; qualification='MSc'; experience='5 years'; subject='Math'; image = $eimg }
Write-Host "Created teacher:"; $t
if ($t.id) { Invoke-RestMethod -Uri "$api/teachers/$($t.id)" -Method Delete -Headers @{ Authorization = "Bearer $token" }; Write-Host "Deleted teacher $($t.id)" }

Write-Host "5) Achievements: create/delete"
$a = CurlMultipart 'POST' "$api/achievements" $token @{ title='E2E Achievement'; description='Auto test'; date=(Get-Date).ToString('yyyy-MM-dd'); category='sports'; image = $eimg }
Write-Host "Created achievement:"; $a
if ($a.id) { Invoke-RestMethod -Uri "$api/achievements/$($a.id)" -Method Delete -Headers @{ Authorization = "Bearer $token" }; Write-Host "Deleted achievement $($a.id)" }

Write-Host "6) Announcements: create/update/delete"
$ann = PostJson "$api/announcements" @{ title='E2E Announcement'; content='Automated announcement test'; isActive = $true } $token
Write-Host "Created announcement:"; $ann
if ($ann.id) {
  $u = Invoke-RestMethod -Uri "$api/announcements/$($ann.id)" -Method Put -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body (@{ title='E2E Announcement Updated' } | ConvertTo-Json)
  Write-Host "Updated announcement:" $u.title
  Invoke-RestMethod -Uri "$api/announcements/$($ann.id)" -Method Delete -Headers @{ Authorization = "Bearer $token" }
  Write-Host "Deleted announcement $($ann.id)"
}

Write-Host "E2E admin flow completed."
