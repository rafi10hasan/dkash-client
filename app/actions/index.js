"use server"

import { signIn } from "@/auth.config";

export async function credentialLogin(data) {
    try {
        const response = await signIn("credentials", {
            mobile_number: data.mobile_number,  // ✅ Updated field
            pin_number: data.pin_number,      // ✅ Updated field
            redirect: false
        });

        return response;
    } catch(error) {
        throw new Error(error);
    }
}

