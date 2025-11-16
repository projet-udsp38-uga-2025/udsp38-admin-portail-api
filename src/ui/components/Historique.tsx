'use client';
import {Breadcrumbs, BreadcrumbItem} from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Historique() {
    const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.items);

     return (
    <Breadcrumbs
      size="lg"
      className="
        [&_*]:!text-gray-900
        [&_*]:!opacity-100
      "
    >
      <BreadcrumbItem href="#" key={0}>
        Portail
      </BreadcrumbItem>

      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem key={index + 1} href={breadcrumb.href}>
          {breadcrumb.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}