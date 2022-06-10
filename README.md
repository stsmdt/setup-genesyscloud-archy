# setup-genesyscloud-archy

The `stsmdt/setup-genesyscloud-archy` action is a TypeScript action that sets up Genesyscloud Archy in your GitHub Actions workflow by:

- Downloading a specific version of Genesyscloud Archy and adding it to the `PATH`.

## Usage

See [action.yml](action.yml)

This action can be run on `ubuntu-latest`, `windows-latest` and `macos-latest` GitHub Actions runners.

A specific version of Genesyscloud has to be specified.

```yaml
steps:
- uses: stsmdt/setup-genesyscloud-archy@v1
  with:
    archy-version: 2.7.0
```

## Inputs

The action supports the following inputs:

- `archy-version` - (required) - The version of Genesyscloud to install.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
