"use client"
import { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/users/create-form';

export default async function CreatePage() {


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/dashboard/users' },
                    {
                        label: 'Create User',
                        href: '/dashboard/users/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}