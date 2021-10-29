# PartyDungeons Scripts

## Information
A collection of scripts to use with `PartyDungeons` (<https://github.com/Expugn/PartyDungeons>).<br>
`PartyDungeons` utilizes the Nashorn JavaScript engine to bring builds to life while providing a system to manage dungeon states keep things in control.

The scripts uploaded here are to be used as an example or reference when writing your own scripts rather than something that can be plug-and-played.

## Downloading Files From Manifest
`PartyDungeons` includes a command that will read from a `manifest` file that you created and bulk download everything.<br>
`/partydungeons download <dungeon_name> <manifest_url>`

Mainifest files must have this line format to download files in:<br>
`<file_save_path>,<url_to_download_file_from>,`<br>
Empty lines or lines starting with `#` will be ignored.

`PartyDungeons` also includes a command that will create a manifest for you:<br>
`/partydungeons manifest <dungeon_name> [root_url]`<br>
You will need to provide the `<url_to_download_file_from>` for every file if you did not provide a `[root_url]`