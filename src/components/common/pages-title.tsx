"use client";

import React from "react";
import Link from "next/link";
import type { IconSvgObject } from "@hugeicons/core-free-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HugeiconsIcon } from "@hugeicons/react";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface PageTitleProps {
  title: string;
  icon: IconSvgObject;
  breadcrumbs: BreadcrumbItemType[];
  className?: string;
}

const PageTitle = ({
  title,
  icon,
  breadcrumbs,
  className,
}: PageTitleProps) => {
  return (
    <div className={`flex items-center gap-6 ${className || ""}`}>
      <HugeiconsIcon
        icon={icon}
        size={44}
        color="currentColor"
        strokeWidth={2}
      />

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold font-heading text-2xl">{title}</h3>

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <React.Fragment key={item.label}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href || "#"}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageTitle;
