"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderStatus from "./OrderStatus";
import {
    Eye,
    Pencil,
    Trash2,
    Printer,
    Search,
} from "lucide-react";

export default function OrderTable({ orders = [] }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch =
                order.customer_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                order.id.toString().includes(search);

            const matchesStatus =
                statusFilter === "All"
                    ? true
                    : order.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [orders, search, statusFilter]);

    return (
        <div className="rounded-xl bg-white shadow">

            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between gap-4 p-6 border-b">

                <h2 className="text-2xl font-bold">
                    Orders
                </h2>

                <div className="flex gap-3">

                    <div className="relative">

                        <Search
                            className="absolute left-3 top-3 text-gray-400"
                            size={18}
                        />

                        <Input
                            placeholder="Search..."
                            className="pl-10 w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <select
                        className="border rounded-md px-3"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >
                        <option>All</option>
                        <option>Pending</option>
                        <option>Preparing</option>
                        <option>Ready</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>

                </div>

            </div>

            {/* Table */}

            <table className="w-full">

                <thead>

                    <tr className="border-b bg-gray-100">

                        <th className="text-left p-4">
                            Order #
                        </th>

                        <th className="text-left">
                            Customer
                        </th>

                        <th className="text-left">
                            Phone
                        </th>

                        <th className="text-left">
                            Payment
                        </th>

                        <th className="text-left">
                            Total
                        </th>

                        <th className="text-left">
                            Status
                        </th>

                        <th className="text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredOrders.length === 0 ? (
                        <tr>

                            <td
                                colSpan={7}
                                className="text-center py-10 text-gray-500"
                            >
                                No Orders Found
                            </td>

                        </tr>
                    ) : (
                        filteredOrders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-4">
                                    #{order.id}
                                </td>

                                <td>
                                    {order.customer_name}
                                </td>

                                <td>
                                    {order.phone}
                                </td>

                                <td>
                                    {order.payment_method}
                                </td>

                                <td>
                                    Rs. {order.total}
                                </td>

                                <td>
                                    <OrderStatus
                                        status={order.status}
                                    />
                                </td>

                                <td>

                                    <div className="flex justify-center gap-2">

                                        <Button
                                            variant="outline"
                                            size="icon"
                                        >
                                            <Eye size={18} />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                        >
                                            <Pencil size={18} />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                        >
                                            <Printer size={18} />
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="icon"
                                        >
                                            <Trash2 size={18} />
                                        </Button>

                                    </div>

                                </td>

                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>
    );
}