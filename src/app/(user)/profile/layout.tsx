import { Sidebar } from "@/components";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // pt-24 để nhường chỗ cho header nếu header fixed; max-w-7xl + px-6 để căn với header
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 flex gap-8 items-start">
        <aside className="w-80 ml-30">
          <Sidebar />
        </aside>
        <main className=" p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default ProfileLayout;
