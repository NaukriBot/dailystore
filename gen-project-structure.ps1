# Read the file into an array of lines
$paths = Get-Content './directory_structure.txt'

# Clear or create the output file
if (Test-Path './output.txt') {
    Clear-Content './output.txt'
} else {
    New-Item -ItemType File -Path './output.txt'
}

# This function will display the tree structure
function Display-TreeStructure {
    param([string[]]$paths)

    # Remove duplicates and sort them
    $sortedPaths = $paths | Sort-Object | Get-Unique

    $tree = @{}

    # Build a tree from the paths
    foreach ($path in $sortedPaths) {
        $current = $tree

        foreach ($part in ($path -split '\\')) {
            if (-not $current.ContainsKey($part)) {
                $current[$part] = @{}
            }
            $current = $current[$part]
        }
    }

    # This recursive function will display the tree
    function Display-Node {
        param([System.Collections.Hashtable]$node, [int]$indent = 0)

        foreach ($key in $node.Keys) {
            $prefix = ' ' * $indent + '|-- '
            "${prefix}$key" | Add-Content './output.txt'
            Display-Node -node $node[$key] -indent ($indent + $key.Length + 4)
        }
    }

    # Display the tree starting from the root
    Display-Node -node $tree
}

# Display the structure
Display-TreeStructure -paths $paths
