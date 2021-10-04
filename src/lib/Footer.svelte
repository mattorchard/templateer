<footer>
	<p>
		Made with
		<a href="https://kit.svelte.dev/" rel='noreferrer nofollow'>SvelteKit</a>,
		<a href="https://www.typescriptlang.org/" rel='noreferrer nofollow'>TypeScript</a>, and
		<a href="https://fontawesome.com/license" rel='noreferrer nofollow'>Font Awesome</a>
		by <em>
		<a href="https://github.com/mattorchard" rel='noreferrer nofollow'>Matthew Orchard</a>
	</em>
	</p>
</footer>
<style>
  footer {
    text-align: end;
    padding: .5rem 1rem;
  }
  footer a {
    color: currentColor;
    text-decoration-color: transparent;
    transition: text-decoration-color .3s ease-in-out;
  }
  footer em {
    font-style: normal;
  }
  footer em a,
  footer:is(:focus-within, :hover) a {
    text-decoration-color: currentColor;
  }
</style>