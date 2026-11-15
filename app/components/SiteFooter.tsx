import { Link } from "react-router";

import { site } from "~/content/site";
import { t } from "~/i18n";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-3xl flex-wrap gap-4 px-4 py-6 text-sm text-gray-700 dark:text-gray-300">
        <a href={site.github} className="hover:underline">
          GitHub
        </a>
        <a href={site.linkedin} className="hover:underline">
          LinkedIn
        </a>
        <Link to="/mentions-legales" className="hover:underline">
          {t.footer.legal}
        </Link>
      </div>
    </footer>
  );
}
