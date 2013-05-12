<?php

/**
 * User controller actions.
 *
 */
class UsersController extends Controller
{
    /**
     * Get all the users.
     *
     * @route GET /users
     *
     * @param Request $request
     * @return Response|View
     */
    public function indexAction($request)
    {
        // serve HTML, JSON and XML
        $request->acceptContentTypes(array('html', 'json', 'xml'));

        if ('html' == $request->getContentType()) {
            $response = new View();
            $response->setLayout('main');
        } else {
            $response = new Response();
        }

        $options = array(
            'sort'  => 'id',
            'order' => 'ASC'
        );

        $response->users = $this->getModel('User')->findAll($options);
        return $response;
    }

    /**
     * Show a user.
     *
     * @route GET /users/1
     * @route GET /users/joao
     *
     * @param Request $request
     * @return Response|View
     * @throws Exception
     */
    public function showAction($request)
    {
        // serve HTML, JSON and XML
        $request->acceptContentTypes(array('html', 'json', 'xml'));

        $model = $this->getModel('User');
        $id = $request->getParam('id');
        $user = is_numeric($id) ? $model->find($id) : $model->findBy(array('username'=>$id));

        if (! $user) {

            $response = new Response();
            $response->setError('User not found',Response::NOT_FOUND);

            return $response;

        }

        if ('html' == $request->getContentType()) {
            $response = new View();
            $response->setLayout('main');
        } else {
            $response = new Response();
            $response->setEtagHeader(md5('/users/' . $user->id));
        }

        $response->user = $user;
        return $response;
    }

    /**
     * Create a user.
     *
     * @route POST /users
     *
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function createAction($request)
    {
        $request->acceptContentTypes(array('json'));

        try {
            $user = new User(array(
                'username' => $request->getPost('username')
            ));
        } catch (ValidationException $e) {
            $response = new Response();
            $response->setError($e->getMessage(), Response::OK);

            return $response;
        }

        $id = $this->getModel('User')->save($user);

        if (!is_numeric($id)) {
            throw new Exception('An error occurred while creating user', Response::OK);
        }

        $response = new Response();
        $response->setCode(Response::CREATED);
        $response->setEtagHeader(md5('/users/' . $id));

        return $response;
    }

    /**
     * Update a user.
     *
     * @route PUT /users/1.json
     *
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function updateAction($request)
    {

        $request->acceptContentTypes(array('json'));

        $id = $request->getParam('id');

        $model = $this->getModel('User');
        $user = $model->find($id);

        if (!$user) {

            $response = new Response();
            $response->setError('User not found',Response::NOT_FOUND);

            return $response;
        }

        try {
            $user->username = $request->getPost('username');
        } catch (ValidationException $e) {
            throw new Exception($e->getMessage(), Response::OK);
        }

        $model->save($user);

        // return 200 OK
        return new Response();
    }

    /**
     * Remove a user.
     *
     * @route DELETE /users/1.json
     *
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function destroyAction($request)
    {
        $request->acceptContentTypes(array('json'));

        $id = $request->getParam('id');
        $model = $this->getModel('User');
        $user = $model->find($id);

        if (!$user) {

            $response = new Response();
            $response->setError('User not found',Response::NOT_FOUND);

            return $response;
        }

        $model->delete($user->id);

        // return 200 OK
        return new Response();
    }
}
