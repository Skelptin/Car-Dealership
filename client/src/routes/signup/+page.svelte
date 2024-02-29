<script>
    import { backendURL } from "../../config/config";
    import { goto } from "$app/navigation";

    console.log(backendURL);

    let formData = {
        username: "",
        email: "",
        location: "",
        password: "",
        role: "",
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${backendURL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Registration Failed");
            } else {
                goto("/login");
            }
        } catch (err) {
            console.error("Error registering:", err);
        }
    };
</script>

<div class="min-h-screen">
    <div
        class="p-3 max-w-lg mx-auto bg-slate-200 rounded-3xl m-10 bg-opacity-20"
    >
        <h1 class="text-3xl text-center font-semibold my-7 h1 text-slate-300">
            Sign Up
        </h1>
        <form
            on:submit|preventDefault={handleSubmit}
            class="flex flex-col gap-4"
        >
            <input
                type="text"
                placeholder="Username"
                class="rounded-lg h-12 input placeholder-slate-800"
                bind:value={formData.username}
                required
            />
            <input
                type="email"
                placeholder="Email"
                class="rounded-lg h-12 input placeholder-slate-800"
                bind:value={formData.email}
                required
            />
            <input
                type="text"
                placeholder="Location"
                class="rounded-lg h-12 input placeholder-slate-800"
                bind:value={formData.location}
                required
            />
            <input
                type="password"
                placeholder="Password"
                class="rounded-lg h-12 input placeholder-slate-800"
                bind:value={formData.password}
                required
            />

            <fieldset class="">
                <legend>What you want to do ?</legend>
                <div class="flex mt-5 justify-evenly gap-2 items-center">
                    <div class="flex gap-2">
                        <input
                            class="radio"
                            type="radio"
                            name="role"
                            value="Buy"
                            id="buy"
                            bind:group={formData.role}
                            required
                        />
                        <label class="label" for="buy">Buy</label>
                    </div>
                    <div class="flex gap-2">
                        <input
                            class="radio"
                            type="radio"
                            name="role"
                            value="Sell"
                            id="sell"
                            bind:group={formData.role}
                        />
                        <label class="label" for="sell">Sell</label>
                    </div>
                </div>
            </fieldset>

            <button class="btn variant-filled-surface"> Sign Up </button>
            <a href="/login" class="label text-blue-100 underline m-1"
                >Already Have an account?</a
            >
        </form>
    </div>
</div>
