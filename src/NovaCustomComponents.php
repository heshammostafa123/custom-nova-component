<?php

namespace Seoegypt\NovaCustomComponents;

use Laravel\Nova\ResourceTool;

class NovaCustomComponents extends ResourceTool
{
    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return 'Nova Custom Components';
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'nova-custom-components';
    }
}
