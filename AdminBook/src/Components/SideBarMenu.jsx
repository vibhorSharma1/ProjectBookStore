import {
  BookOpenIcon,
  DevicePhoneMobileIcon,
  GiftIcon,
  TagIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

function SideBarMenu({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-950 text-white flex flex-col">
        {/* Logo / Title */}
        <div className="p-6 flex items-center space-x-2">
          <Squares2X2Icon className="h-7 w-7 text-purple-300" />
          <span className="text-xl font-bold">Book & Mobile Store</span>
        </div>
        <hr className="border-purple-700 mx-4" />

        {/* Nav Links */}
        <ul className="flex-1 px-4 space-y-2 mt-4">
          {/* Manage Book */}
          <li>
            <a
              href="/bookList"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <BookOpenIcon className="h-6 w-6 text-purple-300" />
              <span className="ml-3">Manage Book</span>
            </a>
          </li>

          {/* Manage Mobile */}
          <li>
            <a
              href="/mobileList"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <DevicePhoneMobileIcon className="h-6 w-6 text-purple-300" />
              <span className="ml-3">Manage Mobile</span>
            </a>
          </li>

          {/* Coupons */}
          <li>
            <a
              href="/coupons"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <GiftIcon className="h-6 w-6 text-purple-300" />
              <span className="ml-3">Coupons</span>
            </a>
          </li>

          {/* Discounts */}
          <li>
            <a
              href="/discounts"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <TagIcon className="h-6 w-6 text-purple-300" />
              <span className="ml-3">Discount</span>
            </a>
          </li>

          {/* Dashboard */}
          <li>
            <a
              href="/dashboard"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <Squares2X2Icon className="h-6 w-6 text-purple-300" />
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
}

export default SideBarMenu;
