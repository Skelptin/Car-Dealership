<script>
    import { token, logout, user } from "../auth/auth.js";

    import "../app.css";

    import { goto } from "$app/navigation";

    let isLoggedIn = false;

    token.subscribe((value) => {
        isLoggedIn = !!value;
        console.log(isLoggedIn);
    });

    const handleClick = () => {
        goto("/signup");
    };

    const handleMyVehicle = () => {
        goto(`${user._id}/myvehicle`);
    };

    const handleSell = () => {
        goto("/dealer/sell");
    };
</script>

<nav class="bg-slate-950 nav shadow-xl text-white">
    <div class="flex justify-between center max-w-6xl mx-auto p-3">
        <h1><a href="/"> <span class="text-red-500 h2">O</span>lx</a></h1>

        <div class="flex items-center gap-10">
            <ul class="flex gap-5">
                <li>
                    <a href="/" class=""> Home </a>
                </li>
                <li>
                    <a href="/about"> About us </a>
                </li>
                <li>
                    <a href="/contactus"> Contact us </a>
                </li>
            </ul>
            <div>
                {#if isLoggedIn}
                    <!-- Show content for logged-in users -->

                    <select
                        name="dropdown"
                        class="btn bg-opacity-5 bg-red-400 rounded-full"
                        id="dropdown"
                    >
                        <option value="profile">{user.username}</option>
                        {#if user.role === "Sell"}
                            <option value="Inventory" on:click={handleMyVehicle}
                                >Inventory</option
                            >
                            <option value="Sell Cars" on:click={handleSell}
                                >Sell Cars</option
                            >
                        {:else}
                            <option
                                value="My Vehicles"
                                on:click={handleMyVehicle}>My Vehicles</option
                            >
                        {/if}
                        <option on:click={logout}> Logout </option>
                    </select>
                {:else}
                    <!-- Show content for non-logged-in users -->
                    <button
                        on:click={handleClick}
                        class="btn bg-gradient-to-br variant-gradient-secondary-tertiary"
                    >
                        Sign Up
                    </button>
                {/if}
            </div>
        </div>
    </div>
</nav>

<slot />
