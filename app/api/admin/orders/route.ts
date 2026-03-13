import { NextRequest, NextResponse } from "next/server";
import { Prisma, UserRole } from "@prisma/client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { adminOrdersQuerySchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsed = adminOrdersQuerySchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query", details: parsed.error.flatten() }, { status: 400 });
    }

    const { status, q, page, pageSize } = parsed.data;

    const where: Prisma.OrderWhereInput = {
      ...(status !== "all" ? { status } : {}),
      ...(q
        ? {
            OR: [
              { orderNumber: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      db.order.findMany({
        where,
        include: { items: true, user: true },
        orderBy: { createdAt: "desc" as const },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.order.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
