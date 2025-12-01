import { createBrowserClient } from '@supabase/ssr'
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/";

    if (token_hash && type) {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          )

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });
        if (!error) {
            // redirect user to specified redirect URL or root of app
            redirect(next);
        } else {
            // redirect the user to an error page with instructions

            redirect(`/error?error=${error.message}`);
        }
    }

    // redirect the user to an error page with instructions
    redirect(`/error?error=Invalid token or type`);
}