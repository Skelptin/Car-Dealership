<script>
    //@ts-nocheck
    import { FileDropzone } from "@skeletonlabs/skeleton";
    import { backendURL } from "../../../config/config.js";
    import axios from "axios";
    import { get } from "svelte/store";
    import { token, user } from "../../../auth/auth.js";
    import { goto } from "$app/navigation";

    let formData = {
        dealerId: user._id,
        type: "",
        brand: "",
        model: "",
        price: "",
    };

    const handleSubmit = async () => {
        console.log(formData);
        try {
            const response = await axios.post(
                `${backendURL}/api/cars/`,
                JSON.stringify(formData),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${get(token)}`,
                    },
                },
            );
            const data = response.data;
            goto("/");
        } catch (error) {
            console.error("Error selling car:", error);
        }
    };
</script>

<div class="items-center text-center min-h-screen">
    <div
        class="p-3 max-w-lg mx-auto bg-slate-200 rounded-3xl m-10 bg-opacity-20"
    >
        <h1 class="text-3xl text-center font-semibold my-7 h1 text-slate-300">
            Sell Car
        </h1>
        <form
            on:submit|preventDefault={handleSubmit}
            class="flex flex-col gap-4"
        >
            <input
                type="text"
                placeholder="Enter Car Type"
                class="rounded-lg h-12 input placeholder-slate-800"
                bind:value={formData.type}
                required
            />
            <input
                type="text"
                placeholder="Enter Car Brand"
                class="rounded-lg h-12 input placeholder-slate-800"
                bind:value={formData.brand}
                required
            />
            <input
                type="text"
                placeholder="Enter Car Model"
                class="rounded-lg h-12 input placeholder-slate-800"
                bind:value={formData.model}
                required
            />
            <input
                type="text"
                placeholder="Enter Car Price"
                class="rounded-lg h-12 input placeholder-slate-800"
                bind:value={formData.price}
                required
            />

            <button type="submit" class="m-5 btn bg-white bg-opacity-10"
                >Sell Car</button
            >
        </form>
    </div>
</div>
