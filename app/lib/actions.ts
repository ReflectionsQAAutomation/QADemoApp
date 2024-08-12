'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    };
    // Test it out:
    console.log(rawFormData);

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    //   await sql`
    //     UPDATE invoices
    //     SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    //     WHERE id = ${id}
    //   `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {

    console.log(id)
    revalidatePath('/dashboard/invoices');
}

export async function deleteUser(id: string) {

    console.log(id)
    revalidatePath('/dashboard/invoices');
}

export async function updateUser(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    //   await sql`
    //     UPDATE invoices
    //     SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    //     WHERE id = ${id}
    //   `;

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}