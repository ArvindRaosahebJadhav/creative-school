import { useState, useEffect } from 'react';
import {
  teachersAPI,
  galleryAPI,
  eventsAPI,
  achievementsAPI,
  announcementsAPI,
  schoolInfoAPI,
} from '../api/services';
import { logger } from '../lib/logger';

// Generic fetch hook
function useFetch(fetchFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFn();
        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || 'Failed to fetch data');
          logger.error('Fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}

// Teachers hook
export function useTeachers() {
  return useFetch(() => teachersAPI.getAll());
}

// Gallery hook
export function useGallery(filter = null) {
  const hook = useFetch(() => {
    if (filter?.type) {
      return galleryAPI.getByType(filter.type);
    } else if (filter?.category) {
      return galleryAPI.getByCategory(filter.category);
    }
    return galleryAPI.getAll();
  });
  return hook;
}

// Events hook
export function useEvents() {
  return useFetch(() => eventsAPI.getAll());
}

// Achievements hook
export function useAchievements(category = null) {
  return useFetch(() =>
    category ? achievementsAPI.getByCategory(category) : achievementsAPI.getAll()
  );
}

// Announcements hook
export function useAnnouncements(activeOnly = false) {
  return useFetch(() => (activeOnly ? announcementsAPI.getActive() : announcementsAPI.getAll()));
}

// School Info hook
export function useSchoolInfo() {
  return useFetch(() => schoolInfoAPI.getAll());
}
