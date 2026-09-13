import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** يرجّع الصفحة لأعلى عند تغيير المسار */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
