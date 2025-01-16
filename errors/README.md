# errors/


> FUTURE:
> 1. Fold in messages inline instead of using the stringfile (`Sail-System-stringfile` still isn't worth it, at least not until post-v1)
> 2. ~~Ideally we don't call `process.exit()` at all- instead, consistently call Sail-System.lower().  See comment at bottom of `fatal.js`.~~ That's ok sometimes actually (We have process handlers anyway.)  The issue is that we really need to inline these, because it all depends on the context.
> 3. Inline these errors where they're being used.  Then this directory can be deleted.
