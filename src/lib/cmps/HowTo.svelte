<h3 class="h3 text-xl">How to use:</h3>

<ol class="list-decimal pl-8">
  <li class="collapse collapse-arrow">
    <input type="checkbox" name="howto" checked={false} />
    <span class="collapse-title text-secondary-500">
      (Optional) Enter a quickstart code!
    </span>
    <p class="collapse-content text-white/60">
      Used Brewskie before? You can restore all of your selections by inputting
      the code you received when downloading the script file! The code should be
      an 8-character long string of gibberish, <code>oHgCsmKN</code> for example.
    </p>
  </li>
  <li class="collapse collapse-arrow">
    <input type="checkbox" name="howto" checked={false} />
    <span class="collapse-title text-secondary-500"
      >Select apps and packages you'd like to install.</span
    >
    <p class="collapse-content text-white/60">
      Choose from the various categories to the right, or <a href="/browse"
        >browse</a
      >
      to select your own brews. When selected, a pop-up will appear with your selected
      brews and allow you to remove or clear your selections.
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#web_storage_concepts_and_usage"
      >
        Selections will persist between uses.
        <ion-icon name="link-outline" class="i" />
      </a>
    </p>
  </li>
  <li class="collapse collapse-arrow">
    <input type="checkbox" name="howto" checked={false} />
    <span class="collapse-title text-secondary-500"
      >Download the script and review it!</span
    >
    <p class="collapse-content text-white/60">
      Click the <button class="btn btn-primary btn-sm uppercase"
        >Get Brewskie</button
      >
      button in the selected brews pop-up to download the script. I strongly encourage
      you to read its contents before running it, make sure you understand what you
      run, and stop if you don't feel comfortable with running it. The script installs
      Homebrew if your machine doesn't have it already, writes a
      <span class="text-secondary-700">brewfile</span>
      into /tmp/brewskie, and attempts to run it using
      <a href="https://docs.brew.sh/Manpage#bundle-subcommand">
        brew bundle --file=/tmp/brewskie
        <ion-icon name="link-outline" class="i" />
      </a>
    </p>
  </li>
  <li class="collapse collapse-arrow">
    <input type="checkbox" name="howto" checked={false} />
    <span class="collapse-title text-secondary-500"
      >Make the script executable and run it!</span
    >
    <p class="collapse-content text-white/60">
      By default, you can't run the script after downloading it -- you have to
      expressly make it executable. This is mainly a security measure, and we
      are all grateful for it.
      <a
        href="https://support.apple.com/en-gb/guide/terminal/apdd100908f-06b3-4e63-8a87-32e71241bab4/mac"
        target="_blank"
        >Please follow Apple's instructions for making a script executable.
        <ion-icon name="link-outline" class="" />
      </a>
      Run it as per the instructions, follow the prompts, and within a few minutes
      you should have all of your selected Brews installed!
    </p>
  </li>
</ol>

<style>
  input[type="checkbox"] {
    width: 100%;
  }
</style>
