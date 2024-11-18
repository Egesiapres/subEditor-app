import DashboardLayout from "./DashboardLayout";

const DashboardUser: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <DashboardLayout>{children}</DashboardLayout>;

export default DashboardUser;
