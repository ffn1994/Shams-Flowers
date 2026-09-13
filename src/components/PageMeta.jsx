import { useEffect } from 'react';
import { site } from '../siteConfig';

function setMeta(selector, attribute, value) {
  const tag = document.head.querySelector(selector);
  if (tag) tag.setAttribute(attribute, value);
}

/**
 * يحدّث عنوان الصفحة ووصفها عند التنقل — مهم للأرشفة وللحفظ بالمفضلة،
 * لأن التطبيق صفحة واحدة والعنوان يبقى ثابت لولا هذا.
 */
export default function PageMeta({ title, description, path = '' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.nameAr}` : `${site.nameAr} | ${site.taglineAr}`;
    document.title = fullTitle;
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('link[rel="canonical"]', 'href', `${site.url}${path}`);
    setMeta('meta[property="og:url"]', 'content', `${site.url}${path}`);

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }
  }, [title, description, path]);

  return null;
}
