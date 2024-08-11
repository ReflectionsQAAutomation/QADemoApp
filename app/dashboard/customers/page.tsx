import { fetchFormattedCustomers } from "@/app/lib/api";
import CustomersTable from "@/app/ui/customers/table";

export default async function Page() {

    const customers = await fetchFormattedCustomers()

    return <CustomersTable customers={customers}/>
}