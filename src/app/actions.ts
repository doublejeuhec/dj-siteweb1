"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const secretCode = formData.get("secret_code")?.toString();
  const joinYear = formData.get("join_year")?.toString();
  const phoneNumber = formData.get("phone_number")?.toString();
  const profession = formData.get("profession")?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email et mot de passe sont requis"
    );
  }

  // Check the secret code
  if (secretCode !== "tirebouchon") {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Le mot de passe secret est incorrect. Seuls les membres de la troupe peuvent s'inscrire."
    );
  }

  // Validate required fields
  if (!joinYear) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Veuillez indiquer votre année d'entrée dans la troupe"
    );
  }

  if (!phoneNumber) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Veuillez indiquer votre numéro de téléphone"
    );
  }

  if (!profession) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Veuillez indiquer votre activité professionnelle actuelle"
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        email: email,
        is_former_member: true,
        join_year: joinYear ? parseInt(joinYear) : null,
        phone_number: phoneNumber,
        profession: profession,
      },
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-up", error.message);
  }

  if (user) {
    try {
      const { error: updateError } = await supabase.from("users").insert({
        id: user.id,
        user_id: user.id,
        name: fullName,
        email: email,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
        is_former_member: true,
        join_year: parseInt(joinYear),
        phone_number: phoneNumber,
        profession: profession,
      });

      if (updateError) {
        // Provide proper error handling with a user-friendly message
        return encodedRedirect(
          "error",
          "/sign-up",
          "Erreur lors de l'enregistrement des informations dans la base de données: " +
            updateError.message
        );
      }
    } catch (err) {
      // Properly handle and inform the user about unexpected errors
      const errMessage =
        err instanceof Error
          ? err.message
          : "Une erreur inattendue s'est produite";
      return encodedRedirect(
        "error",
        "/sign-up",
        "Erreur lors de l'inscription: " + errMessage
      );
    }
  } else {
    // Handle the case where user object is null or undefined
    return encodedRedirect(
      "error",
      "/sign-up",
      "Erreur lors de la création du compte utilisateur"
    );
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Merci de vous être inscrit ! Veuillez vérifier votre email pour le lien de confirmation."
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/espace-membres");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {});

  if (error) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/espace-membres/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/espace-membres/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/espace-membres/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect(
    "success",
    "/espace-membres/reset-password",
    "Password updated"
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    return false;
  }

  return !!subscription;
};
