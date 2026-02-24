import { NextRequest, NextResponse } from "next/server";

export interface BookRequestBody {
  name: string;
  email: string;
  date: string;
  time: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookRequestBody;
    const { name, email, date, time } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { message: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Mock: log and return success
    console.log("[BOOK] Mock booking received:", { name, email, date, time });

    return NextResponse.json({
      success: true,
      message: "Réservation enregistrée (mock).",
    });
  } catch {
    return NextResponse.json(
      { message: "Requête invalide." },
      { status: 400 }
    );
  }
}
