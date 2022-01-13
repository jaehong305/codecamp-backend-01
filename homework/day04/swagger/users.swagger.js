/**
 * @openapi
 * /users:
 *    get:
 *        summary: 회원 목록 조회
 *        tags: [Users]
 *        parameters:
 *            - in: query
 *              name: page
 *              type: int
 *        responses:
 *            200:
 *                description: 성공
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                email:
 *                                    type: string
 *                                    example: codecamp@google.com
 *                                name:
 *                                    type: string
 *                                    example: 철수
 *                                phone:
 *                                    type: string
 *                                    example: 01012341111
 *                                personal:
 *                                    type: string
 *                                    example: 990901
 *                                prefer:
 *                                    type: string
 *                                    example: https://google.com
 */
