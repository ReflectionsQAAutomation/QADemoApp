import { FormattedCustomersTable, InvoiceForm, LatestInvoice } from "./definitions"
import { revenue } from "./placeholder-data"

export interface Users {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
    support: Support
}

export interface User {
    id: string
    email: string
    first_name: string
    last_name: string
    avatar: string
    total_pending: string
    total_paid: string
    total_invoices: string
}

export interface Support {
    url: string
    text: string
}

export const fetchUsers = async (): Promise<Users> => {

    const response = await fetch('https://reqres.in/api/users?page=2');

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const data: Users = await response.json();
    return data;
};

export const fetchInvoices = async () => {

    const response = await fetch('https://reqres.in/api/users?page=2');

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const data: Users = await response.json();

    const customers = data.data

    const invoices = [
        {
            customer_id: customers[0].id,
            amount: 15795,
            status: 'pending',
            date: '2022-12-06',
        },
        {
            customer_id: customers[1].id,
            amount: 20348,
            status: 'pending',
            date: '2022-11-14',
        },
        {
            customer_id: customers[4].id,
            amount: 3040,
            status: 'paid',
            date: '2022-10-29',
        },
        {
            customer_id: customers[3].id,
            amount: 44800,
            status: 'paid',
            date: '2023-09-10',
        },
        {
            customer_id: customers[5].id,
            amount: 34577,
            status: 'pending',
            date: '2023-08-05',
        },
        {
            customer_id: customers[2].id,
            amount: 54246,
            status: 'pending',
            date: '2023-07-16',
        },
        {
            customer_id: customers[0].id,
            amount: 666,
            status: 'pending',
            date: '2023-06-27',
        },
        {
            customer_id: customers[3].id,
            amount: 32545,
            status: 'paid',
            date: '2023-06-09',
        },
        {
            customer_id: customers[4].id,
            amount: 1250,
            status: 'paid',
            date: '2023-06-17',
        },
        {
            customer_id: customers[5].id,
            amount: 8546,
            status: 'paid',
            date: '2023-06-07',
        },
        {
            customer_id: customers[1].id,
            amount: 500,
            status: 'paid',
            date: '2023-08-19',
        },
        {
            customer_id: customers[5].id,
            amount: 8945,
            status: 'paid',
            date: '2023-06-03',
        },
        {
            customer_id: customers[2].id,
            amount: 1000,
            status: 'paid',
            date: '2022-06-05',
        },
    ];

    return invoices
}


export async function fetchLatestInvoices() {

    let latestInvoices: Array<LatestInvoice> = [];

    const customers = (await fetchUsers()).data
    const invoices = await fetchInvoices()

    invoices.map(invoice => {

        const customer = customers.find(c => c.id === invoice.customer_id)

        if (!customer) {
            throw new Error(`Customer not found for invoice with customer_id: ${invoice.customer_id}`);
        }

        const latestInvoice: LatestInvoice = {
            amount: invoice.amount,
            email: customer?.email,
            id: customer?.id.toString(),
            avatar: customer?.avatar,
            name: customer?.first_name
        }

        latestInvoices.push(latestInvoice)
    })

    return latestInvoices
}

export async function fetchCardData() {
    return {
        numberOfCustomers: 5,
        numberOfInvoices: 10,
        totalPaidInvoices: 25,
        totalPendingInvoices: 2,
    };
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const customers = (await fetchUsers()).data
    const invoices = await fetchInvoices()

    const customersFiltered = customers.filter(customer => customer.first_name.match(new RegExp(query, 'i')))

    return customersFiltered.map(customer => {

        const invoicesFiltered = invoices.find(invoice => invoice.customer_id === customer.id)

        if (!invoicesFiltered) {

            throw new Error(`invoices are not for customer ${customer.id}`)
        }

        return {
            ...invoicesFiltered,
            ...customer
        }
    })
}

export async function fetchInvoicesPages(query: string) {

    return 5
}

export async function fetchInvoiceById(id: string) {

    const invoices: InvoiceForm
        =
    {
        amount: 200,
        customer_id: '1',
        id: '2',
        status: 'paid'

    }
    return invoices
}

export async function fetchCustomers() {

    const customers = (await fetchUsers()).data

    return customers
}


export async function fetchRevenue() {

    return revenue
}


export async function fetchFormattedCustomers() {

    const customers = (await fetchUsers()).data
    const invoices = await fetchInvoices()

    let formattedCustomers: Array<FormattedCustomersTable> = []

    customers.map(customer => {

        const customerInvoices = invoices.filter(invoice => invoice.customer_id === customer.id)

        const paidInvoices = customerInvoices.filter(invoice => invoice.status === 'paid')
        const pendingInvoices = customerInvoices.filter(invoice => invoice.status === 'pending')
        const formattedCustomer: FormattedCustomersTable = {
            ...customer,
            total_invoices: customerInvoices.length,
            total_paid: paidInvoices.length.toString(),
            total_pending: pendingInvoices.length.toString()
        }

        formattedCustomers.push(formattedCustomer)

    })

    return formattedCustomers

}

export async function login(email: string, password: string) {

    const request = JSON.stringify({
        email: email,
        password: password
    })

    const response = await fetch('https://reqres.in/api/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: request
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const { token } = await response.json();

    return token
}