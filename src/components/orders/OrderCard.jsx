"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderStatus from "./OrderStatus";

export default function OrderCard({ order }) {
    return (
        <Card className="p-5">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="font-bold text-xl">
                        Order #{order.id}
                    </h2>

                    <p className="text-gray-500">
                        {order.customer_name}
                    </p>

                </div>

                <OrderStatus status={order.status} />

            </div>

            <div className="mt-5 space-y-2">

                {order.items?.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between"
                    >
                        <span>
                            {item.quantity} × {item.name}
                        </span>

                        <span>
                            Rs. {item.price * item.quantity}
                        </span>
                    </div>
                ))}

            </div>

            <div className="mt-5 flex justify-between border-t pt-4">

                <h3 className="font-bold">
                    Total
                </h3>

                <h3 className="font-bold">
                    Rs. {order.total}
                </h3>

            </div>

            <div className="mt-5 flex gap-3">

                <Button className="flex-1">
                    View
                </Button>

                <Button
                    variant="outline"
                    className="flex-1"
                >
                    Print
                </Button>

            </div>

        </Card>
    );
}