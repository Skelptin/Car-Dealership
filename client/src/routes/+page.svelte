<script>
    //@ts-nocheck
    import { token, user } from "../auth/auth.js";
    import { backendURL } from "../config/config.js";
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { createEventDispatcher } from "svelte";
    import Modal from "./Modal.svelte";

    let isLoggedIn = false;
    let searchTerm = "";
    let inventory = [];
    let selectedCar = null;
    let isModalOpen = false;

    token.subscribe((value) => {
        isLoggedIn = !!value;
    });

    const openModal = (car) => {
        selectedCar = car;
        isModalOpen = true;
    };

    const closeModal = () => {
        isModalOpen = false;
    };
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            // Reset search and fetch all cars again
            getAllCars();
        } else {
            // Filter inventory based on search term
            inventory = inventory.filter((car) =>
                car.brand.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }
    };

    const fetchInventory = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/api/cars/${user._id}`,
                {
                    headers: {
                        Authorization: `${get(token)}`,
                    },
                },
            );
            inventory = response.data;
            console.log("inventory", inventory);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };
    const getAllCars = async () => {
        console.log(get(token));
        try {
            const response = await axios.get(
                `${backendURL}/api/cars/getallcars`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${get(token)}`,
                    },
                },
            );
            inventory = response.data;
            console.log("inventory", response);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    const handleEdit = (carId) => {
        goto(`/dealer/car-edit/${carId}`);
    };

    const handleDelete = async (carId) => {
        try {
            // Make API call to delete the car with specified carId
            const response = await axios.delete(
                `${backendURL}/api/cars/delete/${carId}`,
                {
                    headers: {
                        Authorization: `${get(token)}`,
                    },
                },
            );

            // Update the inventory array in Svelte by filtering out the deleted car
            inventory = inventory.filter((car) => car.id !== carId);
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    onMount(() => {
        if (isLoggedIn && user.role === "Sell") {
            fetchInventory();
        } else {
            console.log("all Cars");
            getAllCars();
        }
    });

    const handleReset = () => {
        searchTerm = "";
        fetchCars();
    };

    const handleSell = () => {
        goto("/dealer/sell");
    };

    const handleBuy = (carId) => {
        goto(`/car-details/${carId}`);
    };
</script>

{#if isLoggedIn && user.role === "Sell"}
    <div class="min-h-screen">
        <div class="text-center items-center">
            <h1 class="h1 text-white m-10 text-center">
                Welcome, Sell cars to show it in your Inventory here!!
            </h1>
            <button
                on:click={handleSell}
                class="card-hover w-1/2 bg-opacity-90 btn variant-filled-surface text-center"
            >
                Sell Cars
            </button>
        </div>

        <div>
            <h2 class="h2 m-10 text-center text-white">Your Inventory</h2>
        </div>

        <div
            class="flex flex-wrap gap-2 text-center items-center justify-center"
        >
            {#each inventory as car}
                <div
                    class="card-hover card p-4 g-2 bg-gray-600 text-white rounded-xl"
                >
                    <img
                        class="card-header card-hover"
                        src={car.imageUrl}
                        width="350px"
                        alt="Car image"
                    />
                    <p>Type: {car.type}</p>
                    <p>Brand: {car.brand}</p>
                    <p>Model: {car.model}</p>
                    <p>${car.price}</p>
                    <button
                        on:click={() => openModal(car)}
                        class="card-hover btn variant-filled-surface text-center"
                    >
                        Edit
                    </button>
                    <button
                        on:click={() => handleDelete(car._id)}
                        class="card-hover btn variant-filled-surface text-center"
                        >Delete</button
                    >
                </div>
            {/each}
        </div>
    </div>
{:else if isLoggedIn && user.role === "Buy"}
    <div class="min-h-screen">
        <div class=" text-center items-center">
            <h1 class="h1 text-center text-white m-10">
                Welcome, Select Cars you want to Buy
            </h1>

            <label class="label">
                <input
                    class="input w-1/3 m-10 h-14 placeholder-slate-900"
                    type="text"
                    placeholder="Search Brand Name"
                    bind:value={searchTerm}
                    on:input={handleSearch}
                />
            </label>
        </div>
        <div
            class="flex flex-wrap gap-2 text-center items-center justify-center"
        >
            {#each inventory as car}
                <div
                    class="card-hover card p-4 g-2 bg-gray-600 text-white rounded-xl"
                >
                    <img
                        class="card-header card-hover"
                        src={car.imageUrl}
                        width="350px"
                        alt="Car image"
                    />
                    <p>Type: {car.type}</p>
                    <p>Brand: {car.brand}</p>
                    <p>Model: {car.model}</p>
                    <p>${car.price}</p>
                    <button
                        on:click={() => handleBuy(car.id)}
                        class="card-hover btn variant-filled-surface text-center"
                        >Buy</button
                    >
                </div>
            {/each}
        </div>
    </div>
{:else}
    <div class="min-h-screen">
        <div class="">
            <h1 class="h1 text-center mt-7">Please Login to buy/sell cars!!</h1>
        </div>
    </div>
{/if}
