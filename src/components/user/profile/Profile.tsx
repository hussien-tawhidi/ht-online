
import UserMenus from "./UserMenus";
import Content from "./Content";



export default function Profile() {
  return (
    <div className='min-h-screen p-6'>
      <div className='mx-auto'>
        {/* محتوای اصلی */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* نوار کناری سمت چپ */}
          <UserMenus />

          {/* بخش اصلی محتوا */}
         <Content/>
        </div>
      </div>
    </div>
  );
}
