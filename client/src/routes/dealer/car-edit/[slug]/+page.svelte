<!-- CarEdit.svelte -->

<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { backendURL } from "../../../../config/config.js";
    import { goto } from "$app/navigation";
    import axios from "axios";

    let car = {};

    onMount(async () => {
        const slug = $routeParams.slug; // Access the slug from route parameters
        try {
            const response = await axios.get(`${backendURL}/api/cars/${slug}`, {
                headers: {
                    Authorization: `${get(token)}`,
                },
            });
            car = response.data;
        } catch (error) {
            console.error("Error fetching car details:", error);
        }
    });

    const handleSave = async () => {
        try {
            await axios.put(`${backendURL}/api/cars/update/${car._id}`, car, {
                headers: {
                    Authorization: `${get(token)}`,
                },
            });
            goto("/"); // Redirect to the main page after saving
        } catch (error) {
            console.error("Error updating car details:", error);
        }
    };

    const handleCancel = () => {
        goto("/"); // Redirect to the main page without saving changes
    };
</script>

<div class="min-h-screen">
    <h1>Edit Car Details</h1>

    <form>
        <label>
            Brand:
            <input type="text" bind:value={car.brand} />
        </label>
        <label>
            Model:
            <input type="text" bind:value={car.model} />
        </label>
        <!-- Add more fields as needed -->

        <button type="button" on:click={handleSave}>Save</button>
        <button type="button" on:click={handleCancel}>Cancel</button>
    </form>
</div>
