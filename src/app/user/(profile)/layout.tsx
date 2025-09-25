import { Sidebar } from "@/components";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen mx-24 my-16">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default ProfileLayout;
