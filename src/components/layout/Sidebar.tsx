import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  DocumentChartBarIcon,
  CalendarDaysIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { 
      name: 'الرئيسية', 
      href: '/', 
      icon: HomeIcon 
    },
    { 
      name: 'إدارة المشاركين', 
      href: '/participants',
      icon: UserGroupIcon
    },
    { 
      name: 'إدارة المتون العلمية', 
      href: '/books', 
      icon: BookOpenIcon 
    },
    { 
      name: 'التقارير والمتابعة', 
      href: '/reports', 
      icon: DocumentChartBarIcon 
    },
    { 
      name: 'لوحة الجدولة', 
      href: '/calendar', 
      icon: CalendarDaysIcon 
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* شريط التنقل الجانبي للشاشات الكبيرة */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary-600">استوديو المتون العلمية</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`
                    flex items-center px-4 py-3 rounded-md text-sm font-medium
                    ${isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? 'text-primary-500' : 'text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; استوديو المتون العلمية - {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* شريط التنقل العلوي للشاشات المتوسطة والصغيرة */}
      <div className="lg:hidden">
        <header className="bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between px-4 h-full">
            <h1 className="text-lg font-bold text-primary-600">استوديو المتون العلمية</h1>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </header>

        {/* قائمة الموبايل */}
        {isMobileMenuOpen && (
          <div className="bg-white border-b border-gray-200">
            <nav className="p-2">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center px-3 py-2 rounded-md text-sm font-medium
                        ${isActive(item.href)
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isActive(item.href) ? 'text-primary-500' : 'text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
