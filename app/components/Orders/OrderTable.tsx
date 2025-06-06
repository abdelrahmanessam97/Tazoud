"use client";

import { Order } from "@/app/rtk/slices/orderSlice";
import Link from "next/link";
import { useState } from "react";

type OrderTableProps = {
  columns: string[];
  orders: Order[];
};

function OrderTable({ columns, orders }: OrderTableProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [rowChecked, setRowChecked] = useState<boolean[]>(new Array(orders.length).fill(false));

  const handleMasterCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setRowChecked(new Array(orders.length).fill(isChecked));
  };

  const handleRowCheck = (index: number) => {
    const updatedChecked = [...rowChecked];
    updatedChecked[index] = !updatedChecked[index];
    setRowChecked(updatedChecked);
    setChecked(updatedChecked.every((val) => val));
  };
  return (
    <table className="w-full text-md text-left text-gray-500 whitespace-nowrap">
      <thead className="text-xs text-center bg-gray text-gray-700 uppercase">
        <tr>
          <th className="px-6 py-3">
            <input type="checkbox" className="w-4 h-4 cursor-pointer " checked={checked} onChange={handleMasterCheck} />
          </th>
          {columns.map((col, index) => (
            <th key={index} className="px-6 py-3">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center ">
        {orders.map((row, index) => (
          <tr key={index} className="border-b border-gray text-black/75">
            <td className="px-6 py-4">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" checked={rowChecked[index]} onChange={() => handleRowCheck(index)} />
            </td>
            <td className="px-6 py-4 text-primary">
              <Link href={`/dashboard/orders/${row.code}`}>{row.code}</Link>
            </td>
            <td className="px-6 py-4">{row.latitude}</td>
            <td className="px-2 py-4">{row.latitude}</td>
            <td className="px-6 py-4">
              <div
                className={`  ${
                  row.payment_status === "Refund"
                    ? "bg-indigo-100 text-primary"
                    : `${row.payment_status === "Paid" ? "bg-red-100 text-red-600" : "bg-amber-100 text-yellow"}`
                } px-2 py-1 rounded-md`}
              >
                {row.payment_status}
              </div>
            </td>
            <td className="px-6 py-4">{row.price}</td>
            <td className="px-6 py-4">{row.payment_method}</td>
            <td className="px-6 py-4">
              <div
                className={`
                    ${
                      row.order_status === "Processing"
                        ? "bg-emerald-100 text-green"
                        : `${row.order_status === "Delivered" ? "bg-amber-100 text-yellow" : "bg-red-100 text-red-600"}`
                    } px-2 py-1 rounded-md`}
              >
                {row.order_status}
              </div>
            </td>
            <td className="px-6 py-4 mt-1 flex items-center  gap-2">
              <div className="text-green cursor-pointer">Edit</div>
              <div className="text-red-700 cursor-pointer">Delete</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
