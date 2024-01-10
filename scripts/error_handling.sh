#!/bin/bash

# Function to log errors
log_error() {
  local message="$1"
  echo "Error: $message" >&2
}

# Function to log warnings
log_warning() {
  local message="$1"
  echo "Warning: $message" >&2
}

# Function to handle errors during the release process
handle_errors() {
  local exit_status="$1"
  local command="$2"

  if [ $exit_status -ne 0 ]; then
    log_error "Command '$command' failed with exit status $exit_status"
    exit $exit_status
  fi
}

# Example usage:
# Run a command and handle errors
some_command
handle_errors $? "some_command"

# Run another command and handle warnings
another_command
handle_errors $? "another_command"

# Run a third command and handle errors
yet_another_command
handle_errors $? "yet_another_command"
