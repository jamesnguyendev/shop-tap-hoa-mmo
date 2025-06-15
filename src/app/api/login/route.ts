import { postRequest } from "@/utils/apiClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const Url = `${process.env.NEXT_PUBLIC_ACCESS_TOKEN}/token` || "";
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", email);
  params.append("password", password);
  params.append("client_id", "saleor");
  try {
    const response = await postRequest(Url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.log("Token request failed:", error);
  }
}
