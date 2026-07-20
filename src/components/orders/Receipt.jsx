"use client";

import { Button } from "@/components/ui/button";

export default function Receipt({ order }) {
    if (!order) {
        return (
            <div className="text-center p-10">
                No receipt available.
            </div>
        );
    }

    const subtotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const tax = order.tax ?? 0;
    const discount = order.discount ?? 0;
    const total = subtotal + tax - discount;

    function printReceipt() {
        window.print();
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 print:shadow-none print:rounded-none">

            <div className="text-center border-b pb-4">

                <h1 className="text-3xl font-bold">
                    🔥 FIRE Restaurant
                </h1>

                <p className="text-gray-500">
                    Restaurant Management System
                </p>

            </div>

            <div className="mt-5 space-y-1 text-sm">

                <div className="flex justify-between">
                    <span>Receipt #</span>
                    <span>{order.id}</span>
                </div>

                <div className="flex justify-between">
                    <span>Date</span>
                    <span>{order.date}</span>
                </div>

                <div className="flex justify-between">
                    <span>Customer</span>
                    <span>{order.customer_name}</span>
                </div>

                <div className="flex justify-between">
                    <span>Phone</span>
                    <span>{order.phone}</span>
                </div>

                <div className="flex justify-between">
                    <span>Payment</span>
                    <span>{order.payment_method}</span>
                </div>

            </div>

            <div className="border-y my-5 py-3">

                <div className="flex justify-between font-semibold mb-3">

                    <span>Item</span>

                    <span>Total</span>

                </div>

                {order.items.map((item) => (

                    <div
                        key={item.id}
                        className="flex justify-between py-2"
                    >

                        <div>

                            <p>{item.name}</p>

                            <p className="text-xs text-gray-500">

                                {item.quantity} × Rs. {item.price}

                            </p>

                        </div>

                        <span>

                            Rs. {item.price * item.quantity}

                        </span>

                    </div>

                ))}

            </div>

            <div className="space-y-2">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>Rs. {subtotal}</span>

                </div>

                <div className="flex justify-between">

                    <span>Tax</span>

                    <span>Rs. {tax}</span>

                </div>

                <div className="flex justify-between">

                    <span>Discount</span>

                    <span>- Rs. {discount}</span>

                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">

                    <span>Total</span>

                    <span>Rs. {total}</span>

                </div>

            </div>

            <div className="mt-8 text-center text-gray-500">

                <p>Thank You!</p>

                <p>Please Visit Again ❤️</p>

            </div>

            <Button
                className="w-full mt-6 print:hidden"
                onClick={printReceipt}
            >
                Print Receipt
            </Button>

        </div>
    );
}