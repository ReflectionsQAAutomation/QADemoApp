import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  FormattedCustomersTable,
  Invoice,
  InvoiceForm,
  InvoicesTable,
  LatestInvoice,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { Rowdies } from 'next/font/google';
import { revenue, customers, invoices, users } from './placeholder-data';

export async function fetchRevenue() {

  return revenue
}

export async function fetchLatestInvoices() {

  let latestInvoices: Array<LatestInvoice> = [];

  invoices.map(invoice => {

    const customer = customers.find(c => c.id === invoice.customer_id)

    if (!customer) {
      throw new Error(`Customer not found for invoice with customer_id: ${invoice.customer_id}`);
    }

    const latestInvoice: LatestInvoice = {
      amount: invoice.amount,
      email: customer?.email,
      id: customer?.id,
      image_url: customer?.image_url,
      name: customer?.name
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

  const customersFiltered = customers.filter(customer => customer.name.match(new RegExp(query, 'i')))

  return customersFiltered.map(customer => {
    
    const invoicesFiltered = invoices.find(invoice => invoice.customer_id === customer.id)

    if(!invoicesFiltered) {
      
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

  const invoices: InvoiceForm =
  {
    amount: 200,
    customer_id: '1',
    id: '2',
    status: 'paid'

  }
  return invoices
}

export async function fetchCustomers() {

  return customers
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}


export async function fetchFormattedCustomers() {

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

