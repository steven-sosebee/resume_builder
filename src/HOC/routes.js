

<Routes>
        {arrRoutes.map((route) => (
          <Route path={route.path} element={route.element}/>
        ))}
      </Routes>