import torch

# Check if CUDA is available
print("CUDA Available:", torch.cuda.is_available())

# Get the current device ID (should print an integer if CUDA is available)
print("Current Device ID:", torch.cuda.current_device())

# Number of available GPUs
print("CUDA Device Count:", torch.cuda.device_count())

# Get GPU name
if torch.cuda.is_available():
    print("GPU Name:", torch.cuda.get_device_name(0))
    print("CUDA Version:", torch.version.cuda)