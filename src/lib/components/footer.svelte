<script>
    import axios from 'axios';
	import { variables } from '$lib/env';
	import { onInterval } from '$lib/utils';

	const year = new Date().getFullYear();

    let isServerUp = false;

	async function testServer() {
		axios
			.get(variables.SERVER_URL + '/up')
			.then((response) => {
				if (response.status == 200) {
					isServerUp = true;
				} else {
					isServerUp = false;
				}
			})
			.catch((error) => {
				isServerUp = false;
				console.log(error);
			});
	}

    onInterval(testServer, 10000);
	testServer();
</script>

<footer>
	<div class="border-t-4 m-4 border-blue-400">
        <div>
            <span class="mx-2">Server Status: 
                {#if isServerUp}
                    <span class="text-green-800">UP</span>
                {:else}
                <span class="text-red-800">DOWN</span>
                {/if}
            </span>
            <span class="mx-2">Server Instance: 
                <a class="underline hover:no-underline hover:text-blue-800" href="{variables.SERVER_URL.toString()}" target="_blank" rel="noopener noreferrer"
					>{variables.SERVER_URL.toString()}</a
				>
            </span>
        </div>
		<span class="mx-2">© {year} To-Do List Management</span>
	</div>
</footer>