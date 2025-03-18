"use client";

import { useEffect } from "react";

export default function FormerMemberFields() {
  useEffect(() => {
    const checkbox = document.getElementById("is_former_member");
    const fieldsContainer = document.getElementById("former-member-fields");

    if (checkbox && fieldsContainer) {
      // Initially hide the fields
      fieldsContainer.style.display = "none";

      // Toggle visibility based on checkbox state
      const toggleFields = () => {
        fieldsContainer.style.display = checkbox.checked ? "block" : "none";
      };

      // Set initial state
      toggleFields();

      // Add event listener
      checkbox.addEventListener("change", toggleFields);

      // Cleanup
      return () => {
        checkbox.removeEventListener("change", toggleFields);
      };
    }
  }, []);

  return null;
}
