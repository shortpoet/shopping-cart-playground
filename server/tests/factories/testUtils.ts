describe('ImageRepository', () => {
  let imageRepository: ImageRepository;
  let connection: Connection;
  let testUtils: TestUtils;
  beforeEach(async (done) => {
      const module = await Test.createTestingModule({
          imports : [
              DatabaseModule
          ],
          components: [
              DatabaseService,
              ImageRepositoryProvider,
              TestUtils
          ]
      }).compile();
      testUtils = module.get<TestUtils>(TestUtils);
      await testUtils.reloadFixtures();
      imageRepository = testUtils.databaseService.connection.getCustomRepository(ImageRepository);
      done();
  });
  
  afterEach(async done => {
      await testUtils.closeDbConnection();
      done();
  });