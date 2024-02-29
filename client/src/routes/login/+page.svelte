<script>
    import { login } from "../../auth/auth.js";
    import { backendURL } from "../../config/config.js"; // Make sure to import backendURL from your config file

    const formData = {
        email: "",
        password: "",
    };

    const handleSubmit = async () => {
        try {
            await login(formData); // Call the login function with form data
            window.location.href = "/"; // Redirect after successful login
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };
</script>

<div class="min-h-screen">
    <div
        class="p-3 max-w-lg mx-auto bg-slate-200 rounded-3xl m-10 bg-opacity-20"
    >
        <h1 class="text-3xl text-center font-semibold my-7 h1 text-slate-300">Log In</h1>
        <form
            on:submit|preventDefault={handleSubmit}
            class="flex flex-col gap-4"
        >
            <input
                type="email"
                placeholder="Email"
                class="rounded-lg h-12 input placeholder-slate-800"
                name="email"
                required
                bind:value={formData.email}
            />
            <input
                type="password"
                placeholder="Password"
                class="rounded-lg h-12 input placeholder-slate-800"
                name="password"
                bind:value={formData.password}
                required
            />

            <button type="submit" class="btn variant-filled-surface">
                Log In
            </button>
            <a href="/signup" class="label text-blue-100 underline m-1">
                Haven't registered yet?
            </a>
        </form>
    </div>
</div>
