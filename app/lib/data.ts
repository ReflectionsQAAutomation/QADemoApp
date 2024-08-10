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
import { revenue } from './placeholder-data';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    const data = {
      rows: [
        {
          month: 'Jan',
          revenue: 5000
        },
        {
          month: 'Feb',
          revenue: 2375
        },
        {
          month: 'Mar',
          revenue: 1200
        },
        {
          month: 'Apr',
          revenue: 3420
        },
        {
          month: 'May',
          revenue: 5000
        },
        {
          month: 'Jun',
          revenue: 4210
        },
        {
          month: 'Jul',
          revenue: 1900
        },
        {
          month: 'Aug',
          revenue: 6500
        },
        {
          month: 'Sep',
          revenue: 3845
        },
        {
          month: 'Oct',
          revenue: 1578
        },
        {
          month: 'Nov',
          revenue: 7500
        },
        {
          month: 'Dec',
          revenue: 1021
        }
      ]
    }

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {

  const invoices: Array<LatestInvoice> = [
    {
      name: 'Balaz Orban',
      amount: '5000',
      email: 'balaz@mail.com',
      id: '125',
      image_url: '/customers/balazs-orban.png'
    },
    {
      name: 'Amy Burns',
      amount: '2500',
      email: 'amy@mail.com',
      id: '126',
      image_url: '/customers/amy-burns.png'
    }
  ]

  return invoices
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

  const invoices: Array<InvoicesTable> = [
    {
      name: 'Balaz Orban',
      amount: 5000,
      email: 'balaz@mail.com',
      id: '125',
      image_url: '/customers/balazs-orban.png',
      customer_id: '1',
      date: '2024-05-20',
      status: 'pending'
    },
    {
      name: 'Amy Burns',
      amount: 2500,
      email: 'amy@mail.com',
      id: '126',
      image_url: '/customers/amy-burns.png',
      customer_id: '1',
      date: '2024-07-20',
      status: 'pending'
    }
  ]

  return invoices.filter(invoice => invoice.name.match(new RegExp(query, 'i')))
}

export async function fetchInvoicesPages(query: string) {

  return 5
}

export async function fetchInvoiceById(id: string) {
  // try {
  //   const data = await sql<InvoiceForm>`
  //     SELECT
  //       invoices.id,
  //       invoices.customer_id,
  //       invoices.amount,
  //       invoices.status
  //     FROM invoices
  //     WHERE invoices.id = ${id};
  //   `;

  //   const invoice = data.rows.map((invoice) => ({
  //     ...invoice,
  //     // Convert amount from cents to dollars
  //     amount: invoice.amount / 100,
  //   }));

  //   return invoice[0];
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch invoice.');
  // }

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
  // try {
  //   const data = await sql<CustomerField>`
  //     SELECT
  //       id,
  //       name
  //     FROM customers
  //     ORDER BY name ASC
  //   `;

  //   const customers = data.rows;
  //   return customers;
  // } catch (err) {
  //   console.error('Database Error:', err);
  //   throw new Error('Failed to fetch all customers.');
  // }

  const customers: Array<CustomerField> = [

    {
      id: '1',
      name: 'Amy Burns'
    }
  ]

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

  const customers: Array<FormattedCustomersTable> = [

    {
      email: 'amy@mail.com',
      id: '1',
      image_url: '/customers/amy-burns.png',
      name: 'Amy Burns',
      total_invoices: 1,
      total_paid: '1',
      total_pending: '0'
    }
  ]

  return customers
}

