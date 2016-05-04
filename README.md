# DQL Runner

## Installation

Run `npm install` in the repo directory.


## Configuration

To pre-load form fields, create a `dqlrunner.json` file in the project directory with the following structure:

```json
{
  "cwd": "<path to symfony project>",
  "dql": "<dql query>",
  "opt": "<doctrine options>"
}
```

All properties are optional.


## Usage

### Launching the UI

Run `npm start` in the repo directory.

### When the UI is launched

1. Enter the project directory where your Symfony/Doctrine project lives.
2. Enter the DQL query to be executed.
3. Change DQL options (if necessary).
    
    `[--hydrate HYDRATE]`
    `[--first-result FIRST-RESULT]`
    `[--max-result MAX-RESULT]`
    `[--depth DEPTH]`
    `[--show-sql]`
    `[--em [EM]]`
    `[-h|--help]`
    `[-q|--quiet]`
    `[-v|vv|vvv|--verbose]`
    `[-V|--version]`
    `[--ansi]`
    `[--no-ansi]`
    `[-n|--no-interaction]`
    `[-s|--shell]`
    `[--process-isolation]`
    `[-e|--env ENV]`
    `[--no-debug]`
    
4. Click the "Query..." button.