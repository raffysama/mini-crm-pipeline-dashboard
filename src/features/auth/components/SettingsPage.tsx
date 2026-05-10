import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabaseClient";
import toast from "react-hot-toast";

interface SettingsPageProps {
  user: User;
  onUploadAvatar: (file: File) => Promise<void>;
}

function SettingsPage({ user, onUploadAvatar }: SettingsPageProps) {
  const [displayName, setDisplayName] = useState(
    user.user_metadata?.display_name || "",
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSaveName() {
    setSavingName(true);
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Display name updated");
    }
    setSavingName(false);
  }

  async function handleChangePassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated");
      setNewPassword("");
      setConfirmPassword("");
    }
    setSavingPassword(false);
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-6">
      <h1 className="text-lg font-semibold text-slate-900">Settings</h1>

      {/* Profile */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-700">Profile</h2>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) await onUploadAvatar(file);
              }}
            />
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-200"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold text-slate-600">
                {user.email?.[0].toUpperCase()}
              </div>
            )}
          </label>
          <div>
            <p className="text-sm font-medium text-slate-700">Profile Photo</p>
            <p className="text-xs text-slate-400">Click avatar to upload</p>
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Display Name
          </label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
            placeholder="Your name"
          />
        </div>

        <button
          onClick={handleSaveName}
          disabled={savingName}
          className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {savingName ? "Saving..." : "Save Name"}
        </button>
      </div>

      {/* Password */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-700">
          Change Password
        </h2>

        <div>
          <label className="text-sm font-medium text-slate-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 text-sm outline-none focus:border-slate-400"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <i
                className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"} text-base`}
              />
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 text-sm outline-none focus:border-slate-400"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <i
                className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"} text-base`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          disabled={savingPassword}
          className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {savingPassword ? "Saving..." : "Update Password"}
        </button>
      </div>

      {/* Account Info */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-2">
        <h2 className="text-sm font-semibold text-slate-700">Account</h2>
        <p className="text-sm text-slate-500">
          Email: <span className="text-slate-700">{user.email}</span>
        </p>
      </div>
    </div>
  );
}

export default SettingsPage;
