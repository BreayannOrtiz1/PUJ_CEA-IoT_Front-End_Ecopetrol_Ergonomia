//CRUDTable.tsx
import { DynamicTable } from "../../components/tables/BasicTables/DynamicTable";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BaseTableCRUD from "../../components/tables/BasicTables/BaseTableCRUD";

export default function CRUDTable() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        
        <DynamicTable tableName="gateway" />
        
      </div>
    </>
  );
}
