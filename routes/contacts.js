 
router.get('/', contactsController.list);
router.get('/:id', contactsController.detail); 
router.post('/new', contactsController.create);
router.post('/:id/edit', contactsController.update);